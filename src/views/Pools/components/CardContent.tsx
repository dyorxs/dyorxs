import { FC } from 'react'
import styled from 'styled-components'

const CardContent: FC = ({ children }) => <StyledCardContent>{children}</StyledCardContent>

const StyledCardContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0;
`

export default CardContent
