import { Button, Modal } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import ModalActions from 'components/ModalActions'
import { FC, FormEvent, useCallback, useMemo, useState } from 'react'
import { getFullDisplayBalance } from 'utils/formatBalance'
import TokenInput from '../../../components/TokenInput'
import useI18n from '../../../hooks/useI18n'

interface DepositModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
}

const DepositModal: FC<DepositModalProps> = ({ max, onConfirm, onDismiss, tokenName = '' }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const handleChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal title={`${TranslateString(316, 'Deposit')} ${tokenName} Tokens`} onDismiss={onDismiss}>
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <ModalActions>
        <Button fullwidth variant='secondary' onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </Button>
        <Button
          fullwidth
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default DepositModal
