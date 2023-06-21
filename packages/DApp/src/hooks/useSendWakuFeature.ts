import { useCallback } from 'react'
import { useWaku } from '../providers/waku/provider'
import { useEthers, useSigner } from '@usedapp/core'
import { config } from '../config'
import { createWakuFeatureMsg } from '../helpers/wakuFeature'
import { EncoderV0 } from 'js-waku/lib/waku_message/version_0'
import { useTypedFeatureVote } from './useTypedFeatureVote'

export function useSendWakuFeature() {
  const { waku } = useWaku()
  const signer = useSigner()
  const { account } = useEthers()
  const { getTypedFeatureVote } = useTypedFeatureVote()

  const sendWakuFeature = useCallback(
    async (voteAmount: number, publicKey: string) => {
      const timestamp = Math.floor(Date.now())
      const msg = await createWakuFeatureMsg(account, signer, voteAmount, publicKey, timestamp, getTypedFeatureVote)
      if (msg) {
        if (waku) {
          await waku.lightPush.push(new EncoderV0(config.wakuConfig.wakuFeatureTopic), { payload: msg })
        } else {
          alert('error sending feature vote please try again')
        }
      }
    },
    [waku, signer, account, getTypedFeatureVote]
  )

  return sendWakuFeature
}
