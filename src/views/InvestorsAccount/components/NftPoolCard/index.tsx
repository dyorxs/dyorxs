import { Button, Flex, Heading, Text } from 'alium-uikit/src'
import { BigNumber, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PoolsTypes } from '../../constants/pools'

interface NftPoolCardProps {
  pool: PoolsTypes
  onClaim: (pid: number) => void
  pending: boolean
  isLoading?: boolean
}

const NftPoolCardWrap = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  align-content: center;
  background: #ffffff;
  border-radius: 6px;
  width: 100%;
  padding: 24px;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`

const Field = styled(Flex)<{ maxWidth: string }>`
  font-style: normal;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.3px;
  color: #131313;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  flex: 1;
  &:last-child {
    justify-content: flex-end;
  }
  @media (max-width: 1024px) {
    max-width: unset;
    padding: 10px 16px;
    justify-content: space-between;
    text-align: right;
    &:nth-child(2n + 1) {
      background-color: #f4f5fa;
    }
    &:first-child {
      background-color: #fff;
    }
    &:last-child {
      justify-content: space-between;
    }
  }
`

const FieldName = styled(Text)`
  display: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  color: #8990a5;
  text-align: left;
  @media (max-width: 1024px) {
    display: block;
  }
`
const FieldValue = styled(Flex)`
  flex-direction: row;
  align-items: center;
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-end;
  }
`

const FieldPool = styled(Field)`
  flex-direction: column;
  text-align: left;
  @media (max-width: 1024px) {
    margin-bottom: 16px;
    padding: 0;
  }
`
const FieldClaim = styled(Field)`
  align-items: center;
  align-content: center;
  & > div {
    width: 100%;
    justify-content: space-between;
    flex-direction: row-reverse;
  }
  button {
    margin-left: 8px;
  }
  @media (max-width: 1024px) {
    align-items: flex-start;
    justify-content: space-between;
    button {
      margin-top: 8px;
      margin-left: 0;
    }
    & > div {
      width: unset;
      flex-direction: column;
      align-items: flex-end;
    }
  }
`

const FieldPoolDescription = styled(Flex)`
  margin-top: 8px;
  flex-direction: row;
`

const month = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
}

const getTimeFormat = (timestamp: string | undefined) => {
  if (timestamp === '0') {
    return 'completed'
  }
  if (timestamp) {
    const date = new Date(parseInt(`${timestamp}000`, 10))
    return `${date.getDate()}th ${month[date.getMonth()]} ${date.getFullYear()}`
  }
  return 'loading'
}

const unlockedByTimestamp = (timestamp: string | undefined) => {
  if (timestamp === '0') {
    return true
  }
  if (timestamp) {
    const date = new Date(parseInt(`${timestamp}000`, 10))
    return new Date() > date
  }
  return false
}

function NftPoolCard({ pool, onClaim, pending, isLoading }: NftPoolCardProps) {
  // Temp formatter date
  const original_timestamp = pool?.timestamp || '0'
  const formattedTime = getTimeFormat(original_timestamp)
  const TEMP_CONDITION_FOR_21_JULY = formattedTime === '21th July 2021'
  const addingAWeek = Number(original_timestamp) + 604800
  const extensionUpToAWeekTimeStamp = TEMP_CONDITION_FOR_21_JULY ? addingAWeek.toString() : original_timestamp
  // console.log('TIMESTAMP_ORIGINAL', original_timestamp)
  // console.log('TIMESTAMP_CHANGED', extensionUpToAWeekTimeStamp)
  // end
  const total = ethers.utils.formatEther(pool.total || BigNumber.from(0))
  const locked = ethers.utils.formatEther(pool.locked || BigNumber.from(0))
  const unlocked = ethers.utils.formatEther(pool.unlocked || BigNumber.from(0))
  const claimed = ethers.utils.formatEther(pool.claimed || BigNumber.from(0))
  // unlock with timestamp
  const unlockWithTimestamp = TEMP_CONDITION_FOR_21_JULY
    ? unlockedByTimestamp(extensionUpToAWeekTimeStamp) || !!Number(unlocked)
    : !!Number(unlocked)
  //
  const isUnlocked = unlockWithTimestamp
  const [isLoadingLocal, setIsLoadingLocal] = useState(false)

  const [initClaimed, setInitClaimed] = useState<string>('')

  useEffect(() => {
    if (isLoading === true) setIsLoadingLocal(true)
  }, [isLoading])

  useEffect(() => {
    if (!initClaimed) setInitClaimed(claimed)
  }, [claimed, initClaimed])

  useEffect(() => {
    if (initClaimed !== claimed) setIsLoadingLocal(false)
  }, [claimed, initClaimed])

  return (
    <NftPoolCardWrap>
      <FieldPool maxWidth='310px'>
        <Heading as='h3' size='lg' color='#131313'>
          {pool.name}
        </Heading>
        <FieldPoolDescription>
          <Text fontSize='14' color='#8990A5'>
            {pool.description}
          </Text>
        </FieldPoolDescription>
      </FieldPool>
      <Field maxWidth='96px'>
        <FieldName>Total ALMs</FieldName>
        {total}
      </Field>
      <Field maxWidth='96px'>
        <FieldName>Locked</FieldName>
        {locked}
      </Field>
      <Field maxWidth='80px'>
        <FieldName>Unlocked</FieldName>
        {unlocked}
      </Field>
      <FieldClaim maxWidth='172px'>
        <FieldName>Claimed</FieldName>
        <FieldValue>
          {claimed}
          {isUnlocked && (
            <Button
              variant='secondary'
              size='sm'
              disabled={pending || isLoading || isLoadingLocal}
              onClick={() => {
                onClaim(pool.id)
              }}
            >
              {pending ? 'Wait' : 'Claim'}
            </Button>
          )}
        </FieldValue>
      </FieldClaim>
      <Field maxWidth='140px'>
        <FieldName>Next unclocked date</FieldName>
        {/* {getTimeFormat(pool.timestamp)} */}
        {getTimeFormat(extensionUpToAWeekTimeStamp)}
      </Field>
    </NftPoolCardWrap>
  )
}

export default NftPoolCard
