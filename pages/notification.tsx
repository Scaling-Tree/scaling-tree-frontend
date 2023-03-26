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
import NotificationView from "@/Views/NotificationView";

export default function Notification() {
  return (
    <MainLayout>
      <NotificationView />
    </MainLayout>
  );
}
