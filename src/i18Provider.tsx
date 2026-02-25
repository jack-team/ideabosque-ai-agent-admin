import { I18nextProvider } from "react-i18next";
import type { FC, PropsWithChildren } from "react";
import i18n from "@/i18n";

const I18nProvider: FC<PropsWithChildren> = (props) => {
  return (
    <I18nextProvider i18n={i18n}>
      {props.children}
    </I18nextProvider>
  );
}

export default I18nProvider;