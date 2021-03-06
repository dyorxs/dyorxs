import { ButtonMenu, ButtonMenuItem, Text, Toggle } from 'alium-uikit/src'
import useI18n from 'hooks/useI18n'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 32px;
`

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 32px;
  margin-left: 16px;

  ${Text} {
    margin-left: 8px;
  }
`

const FarmTabButtons = ({ stackedOnly, setStackedOnly }) => {
  // const { url, isExact } = useRouteMatch()
  const { query } = useRouter()
  const url = query?.url
  const isExact = query?.url

  const TranslateString = useI18n()

  return (
    <Wrapper>
      <ButtonMenu activeIndex={isExact ? 0 : 1} size='sm' variant='subtle'>
        <ButtonMenuItem as={Link} href={`${url}`}>
          {TranslateString(698, 'Active')}
        </ButtonMenuItem>
        <ButtonMenuItem as={Link} href={`${url}/history`}>
          {TranslateString(700, 'Inactive')}
        </ButtonMenuItem>
      </ButtonMenu>
      <ToggleWrapper>
        <Toggle checked={stackedOnly} onChange={() => setStackedOnly(!stackedOnly)} />
        <Text> {TranslateString(1116, 'Staked only')}</Text>
      </ToggleWrapper>
    </Wrapper>
  )
}

export default FarmTabButtons
