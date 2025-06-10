import type { FC } from 'react';
import { useListenModalOk } from '@/components/TriggerModal/hooks';

const ConnectLlm: FC = () => {

  useListenModalOk(async () => {
    return new Promise(r=> {
      setTimeout(r, 3000)
    })
  })

  return (
    <div>
      Enter your LLM API KeyTo obtain this key, go to the integrations tab in your LLM and copy the API Key. (This may be different for each platform, so check their FAQ to see how to obtain the key.)
    </div>
  )
}

export default ConnectLlm;