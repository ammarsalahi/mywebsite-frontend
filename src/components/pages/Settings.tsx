import React, { useEffect, useState } from "react";
import Profile from "../settings/Profile";
import PasswordChange from "../settings/PasswordChange";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  settingsSelector,
  themeSelector,
  tokenSelector,
} from "../states/Selectors";
import SettingNav from "../settings/SettingNav";
import Otp from "../settings/Otp";
import { Api } from "../api/Index";
import { USERS_ID } from "../api/Endpoints";
import { AuthConfigHeader } from "../api/Configs";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";

export default function Settings() {
  const [settings, setSettings] = useRecoilState(settingsSelector);
  const theme = useRecoilValue(themeSelector);
  const token = useRecoilValue(tokenSelector);
  const [userInfo, setUserInfo] = useState<any[] | []>([]);
  const [isLoad, setIsLoad] = useState(false);
  const { t } = useTranslation();
  const getUserInfo = async () => {
    await Api.get(USERS_ID(token.user), {
      headers: AuthConfigHeader(token.access),
    }).then((res) => {
      setUserInfo(res.data);
      setSettings("profile");
      setIsLoad(true);
    });
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div dir={t("dir")} className="px-10">
      {isLoad ? (
        <div className={theme == "light" ? "card-light" : "card-dark"}>
          <div className="card-body py-3 px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-0">
              <div
                className={
                  theme == "dark"
                    ? "border-e border-gray-700"
                    : "border-e border-gray-300"
                }
              >
                <SettingNav theme={theme} />
              </div>
              <div className="md:col-span-2 lg:col-span-3 p-5">
                {settings == "profile" && (
                  <Profile
                    user={userInfo}
                    token={token}
                    reload={getUserInfo}
                    theme={theme}
                  />
                )}
                {settings == "password" && (
                  <PasswordChange token={token.access} />
                )}
                {settings == "otp" && <Otp token={token} user={userInfo} />}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full-screen w-full grid place-items-center">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
}
