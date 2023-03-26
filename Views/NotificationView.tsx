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
  const [inputMessage, setInputMessage] = React.useState("");
  const { address, connector, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const isMounted = useIsMounted();
  const channelAddress = process.env.NEXT_PUBLIC_PUSH_CHANNEL_ID;

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
      <div className="">
        <div className="flex items-center justify-between mt-5">
          <input
            type={"text"}
            className={"border-2 border-gray-300 p-2 rounded-xl w-full"}
            placeholder={"Enter your message"}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button
            onClick={async () => {
              if (signer && address) {
                await PushAPI.payloads.sendNotification({
                  signer: new ethers.Wallet(
                    process.env.NEXT_PUBLIC_PUSH_ADMIN_PK as string,
                    new ethers.providers.JsonRpcProvider(
                      process.env.NEXT_PUBLIC_ALCHEMY_HTTPS
                    )
                  ),
                  type: 1, // broadcast
                  identityType: 2, // direct payload
                  notification: {
                    title: `${address}`,
                    body: `${inputMessage}`,
                  },
                  payload: {
                    title: `${address}`,
                    body: `${inputMessage}`,
                    cta: "",
                    img: "",
                  },
                  channel: `eip155:5:${process.env.NEXT_PUBLIC_PUSH_CHANNEL_ID}`, // your channel address
                  env: ENV.STAGING,
                });
                setInputMessage("");
                await fetchNotifs(address);
              }
            }}
            className="ml-3 bg-green-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
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
