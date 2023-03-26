import MainLayout from "../components/Layout/MainLayout";
import * as PushAPI from "@pushprotocol/restapi";
import { useEffect } from "react";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import {
  NotificationItem,
  chainNameType,
  SubscribedModal,
} from "@pushprotocol/uiweb";
import React from "react";
import { useAccount, useSigner } from "wagmi";
import Spinner from "@/components/Spinner";
import { ethers } from "ethers";
import { useIsMounted } from "@/hooks";
export default function NotificationView() {
  const [notifications, setNotifications] = React.useState([]);
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const { address, connector, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const isMounted = useIsMounted();
  const channelAddress = "0x05cd35f8d7011b42ef579ccab9d6982cdd9f24cd";

  const fetchNotifs = async (address: string) => {
    const _notifications = await PushAPI.user.getFeeds({
      user: `eip155:5:${address}`, // user address in CAIP-10
      env: ENV.STAGING,
    });
    console.log(_notifications, "notifications");

    setNotifications(_notifications);
  };

  useEffect(() => {
    let intervalId: any;
    (async () => {
      if (address && isSubscribed) {
        await fetchNotifs(address);
        intervalId = setInterval(() => {
          fetchNotifs(address);
        }, 5000);
      }
    })();
    return () => clearInterval(intervalId);
  }, [address, isSubscribed]);

  useEffect(() => {
    (async () => {
      if (address) {
        const subscriptions = await PushAPI.user.getSubscriptions({
          user: `eip155:5:${address}`, // user address in CAIP
          env: ENV.STAGING,
        });
        if (
          subscriptions?.find((item: { channel: string }) => {
            console.log(item);
            console.log(item?.channel);
            return item?.channel === channelAddress;
          })
        ) {
          setIsSubscribed(true);
        }
        setIsLoading(false);
      }
    })();
  }, [address]);

  if (!isMounted) return null;

  if (!isConnected) {
    return <></>;
  }
  if (isLoading) {
    return (
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          top: "50%",
          left: "50%",
        }}
      >
        <Spinner />
      </div>
    );
  }

  if (!isSubscribed) {
    return (
      <div className="max-w-[1000px] mx-auto">
        <button
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className="absolute bg-green-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={async () => {
            if (signer && address) {
              await PushAPI.channels.subscribe({
                signer: signer as ethers.providers.JsonRpcSigner,
                channelAddress: `eip155:5:${channelAddress}`, // channel address in CAIP
                userAddress: `eip155:5:${address}`, // user address in CAIP
                onSuccess: () => {
                  console.log("opt in success");
                  // fetchNotifs(address);
                  setIsSubscribed(true);
                },
                onError: () => {
                  console.error("opt in error");
                },
                env: ENV.STAGING,
              });
            }
          }}
        >
          Subscribe notification
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto">
      {notifications.map((oneNotification, i) => {
        const {
          cta,
          title,
          message,
          app,
          icon,
          image,
          url,
          blockchain,
          secret,
          notification,
          sid,
        } = oneNotification;

        return (
          <NotificationItem
            key={`notif-${sid}`}
            notificationTitle={secret ? notification["title"] : title}
            notificationBody={secret ? notification["body"] : message}
            cta={cta}
            app={app}
            icon={icon}
            image={image}
            url={url}
            theme={"light"}
            chainName={blockchain as chainNameType}
          />
        );
      })}
    </div>
  );
}
