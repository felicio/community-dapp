import { BigNumber } from 'ethers'

export type WakuVoteData = {
  sntAmount: BigNumber
  address: string
  vote: string
  sign: string
  timestamp: number
  roomID: number
}

export type WakuFeatureData = {
  timestamp: Date
  msgTimestamp: Date
  sntAmount: BigNumber
  voter: string
  publicKey: string
  sign: string
}
