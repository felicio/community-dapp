import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ButtonPrimary } from '../Button'
import { CardCommunity } from './CardCommunity'
import { VotePropose } from '../votes/VotePropose'
import { Warning } from '../votes/VoteWarning'
import { ConfirmBtn } from './VoteConfirmModal'
import { useContractFunction } from '@usedapp/core'
import { useContracts } from '../../hooks/useContracts'
import { CommunityDetail } from '../../models/community'
import { CommunitySkeleton } from '../skeleton/CommunitySkeleton'
import { useCommunityDetails } from '../../hooks/useCommunityDetails'
import { ColumnFlexDiv, WrapperBottomMid } from '../../constants/styles'
import { BigNumber } from 'ethers'
import { useProposeWarning } from '../../hooks/useProposeWarning'
import { PublicKeyInput } from '../PublicKeyInput'

interface ProposeModalProps {
  availableAmount: number
  setShowConfirmModal: (val: boolean) => void
  setCommunityFound: (community: CommunityDetail | undefined) => void
  communityFound: CommunityDetail | undefined
}

export function ProposeModal({
  availableAmount,
  setShowConfirmModal,
  setCommunityFound,
  communityFound,
}: ProposeModalProps) {
  const [proposingAmount, setProposingAmount] = useState(0)
  const [publicKey, setPublicKey] = useState('')
  const loading = useCommunityDetails(publicKey, setCommunityFound)
  const { votingContract } = useContracts()
  const { send, state } = useContractFunction(votingContract, 'initializeVotingRoom')

  const warning = useProposeWarning(communityFound, availableAmount)

  useEffect(() => {
    if (state.status === 'Mining') {
      setShowConfirmModal(true)
    }
  }, [state])

  return (
    <ColumnFlexDiv>
      <WrapperBottomMid>
        <PublicKeyInput publicKey={publicKey} setPublicKey={setPublicKey} />
      </WrapperBottomMid>

      <ProposingData>
        {communityFound ? <CardCommunity community={communityFound} /> : loading && publicKey && <CommunitySkeleton />}
        <WarningWrap>{warning.text && <Warning icon={warning.icon} text={warning.text} />}</WarningWrap>
        {communityFound && communityFound.validForAddition && publicKey && (
          <VoteProposeWrap>
            <VotePropose
              availableAmount={availableAmount}
              setProposingAmount={setProposingAmount}
              proposingAmount={proposingAmount}
              disabled={!communityFound}
            />
          </VoteProposeWrap>
        )}
        {!publicKey && (
          <ProposingInfo>
            <span>ℹ️</span>
            <InfoText>To propose a community, it must have at least 42 members and have a ENS domain.</InfoText>
          </ProposingInfo>
        )}
      </ProposingData>

      {communityFound && !communityFound.validForAddition ? (
        <ConfirmBtn onClick={() => setShowConfirmModal(false)}>
          OK, let’s move on! <span>🤙</span>
        </ConfirmBtn>
      ) : (
        <ProposingBtn
          disabled={!communityFound || !proposingAmount || !!warning.text}
          onClick={() => send(1, publicKey, BigNumber.from(proposingAmount))}
        >
          Confirm vote to add community
        </ProposingBtn>
      )}
    </ColumnFlexDiv>
  )
}

export const VoteProposeWrap = styled.div`
  margin-top: 32px;

  @media (max-width: 600px) {
    margin-top: 0;
  }
`

const ProposingData = styled.div`
  width: 100%;
`

export const ProposingInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 600px) {
    max-width: 525px;
  }

  & > span {
    font-size: 24px;
    line-height: 32px;
    margin-right: 16px;
  }
`

export const InfoText = styled.div`
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.1px;
`

const ProposingBtn = styled(ButtonPrimary)`
  width: 100%;
  padding: 11px 0;
  margin-top: 32px;
`
export const WarningWrap = styled.div`
  margin: 0;
`
