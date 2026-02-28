import { type FC } from 'react';
import { Divider, App, Space } from 'antd';
import copy from 'copy-to-clipboard';
import Button from '@/components/Button';
import { useLang } from '@/hooks/useLang';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ProForm, ProFormSelect, ProFormDependency } from '@ant-design/pro-components';
import { useAiSdk } from '@/hooks/useAiSdk';
import type { AgentDataType } from '@/typings/agent';
import { sdkUrl, partId } from '@/env';
import { renderTpl } from './helper';
import styles from './styles.module.less';
import codeTpl from './code_tpl.txt?raw';

type ReviewAgentContentProps = {
  agents: AgentDataType[];
  coordinationUuid: string;
}

type FormDataType = {
  agent: string;
  openMode: OpenModeType;
  position: BubblePositionType;
}

const $body = document.body;

const ReviewAgentContent: FC<ReviewAgentContentProps> = (props) => {
  const { agents, coordinationUuid } = props;
  const { message } = App.useApp();
  const { t } = useLang();
  const [form] = ProForm.useForm<FormDataType>();
  const [lasterAgent] = agents;

  const { sdk, target } = useAiSdk({
    openMode: 'window',
    configs: {
      coordination: coordinationUuid,
      agent: lasterAgent.agentUuid,
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.review_box}>
        <div ref={target} className={styles.content} />
      </div>
      <ProForm
        form={form}
        submitter={false}
        className={styles.form}
        initialValues={{
          agent: lasterAgent.agentUuid
        }}
      >
        <ProFormSelect<AgentDataType>
          label={t('agent.chooseAgent')}
          name="agent"
          options={agents}
          fieldProps={{
            allowClear: false,
            popupMatchSelectWidth: false,
            getPopupContainer: () => $body,
            fieldNames: {
              label: 'agentName',
              value: 'agentUuid'
            }
          }}
          onChange={async (val) => {
            const result = await sdk?.updateChatConfigs({
              agent: val
            });
            if (result && sdk) sdk.resultData = result;
          }}
        />
        <Divider>{t('agent.integration')}</Divider>
        <div className={styles.integration}>
          <ProFormDependency name={['agent']}>
            {({ agent }) => {
              const curAgent = agents.find(e => {
                return e.agentUuid === agent;
              });

              if (!curAgent) {
                return null;
              }

              const code = renderTpl(codeTpl, {
                sdkUrl,
                partId,
                agent,
                coordination: coordinationUuid
              });

              return (
                <div className={styles.integration_content}>
                  <Space>
                    <Button
                      size="small"
                      children={t('agent.copyCode')}
                      onClick={() => {
                        copy(code);
                        message.success(t('common.Successfully copied to clipboard'));
                      }}
                    />
                    {!!sdk && (
                      <Button
                        size="small"
                        children={t('agent.CopyChatUrl')}
                        onClick={() => {
                          copy(sdk.resultData.data.chatUrl);
                          message.success(t('common.Successfully copied to clipboard'));
                        }}
                      />
                    )}
                  </Space>
                  <div className={styles.code_box}>
                    <SyntaxHighlighter style={dark} language="javascript">
                      {code}
                    </SyntaxHighlighter>
                  </div>
                </div>
              );
            }}
          </ProFormDependency>
        </div>
      </ProForm>
    </div>
  );
}

export default ReviewAgentContent;