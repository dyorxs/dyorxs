import { useModal } from 'alium-uikit/src'
import { NextLink } from 'components/NextLink'
import { motion } from 'framer-motion'
import { FC, FormEvent, useState } from 'react'
import { ROUTES } from 'routes'
import styled from 'styled-components'
import { dbMailListCreateEmail } from 'utils/firebase'
import CongratsModal from 'views/Home/components/CongratsModal'

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  max-width: 1122px;
  width: 100%;
  margin: 0 auto 80px auto;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    margin: 0 auto 0 auto;
  }
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 546px;
  width: 100%;
  /* margin: 147px auto 0 auto; */
  margin-top: 147px;

  /* @media screen and (min-width: 1320px) {
    margin: 0;
  } */
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto 0 auto;
  }
`

const RightColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 430px;
  height: 502px;
  padding-top: 190px;
  padding-left: 0;
  position: relative;
  margin: auto;
  zoom: 0.1;

  @media screen and (min-width: 640px) {
    zoom: 1;
    margin: 0;
    padding: 0;
  }

  @media screen and (min-width: 1320px) {
    margin: 0;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    zoom: inherit;
    margin: 0;
    padding: 0;
    height: 300px;
  }
  @media screen and (max-width: 414px) {
    zoom: 0.8;
  }
`

const StartingSoon = styled.div`
  margin-top: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: hsl(155, 44%, 81%);
  border: 1px solid hsl(155, 68%, 44%);
  border-radius: 6px;
  width: 101px;
  height: 30px;
  font-family: Roboto, sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 1px;
  color: hsl(155, 68%, 44%);
  @media screen and (max-width: 768px) {
    margin-top: 5px;
  }
`

const H1 = styled.h1`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 58px;
  line-height: 46px;
  letter-spacing: 0.3px;
  margin-top: 32px;
  color: #67c200;
  span {
    margin-left: 8px;
  }

  @media screen and (max-width: 1024px) {
    font-size: 40px;
    line-height: 48px;

    span {
      display: block;
      margin-left: 0;
    }
  }
  @media screen and (max-width: 768px) {
    line-height: 40px;
    margin-top: 16px;
    padding-right: 24px;
    padding-left: 24px;
    span {
      display: inline-block;
      margin-left: 8px;
    }
  }
  @media screen and (max-width: 414px) {
    padding-right: 16px;
    padding-left: 16px;
    font-size: 32px;
  }
  @media screen and (max-width: 350px) {
    font-size: 33px;
  }
`

const H2 = styled.h2`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.3px;
  color: #000000;
  margin-top: 25px;
  @media screen and (max-width: 1024px) {
    max-width: 278px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 9px;
    text-align: center;
  }
  @media screen and (max-width: 414px) {
    text-align: center;
    font-size: 16px;
  }
`
const H3 = styled.h3`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.3px;
  color: #7a7a7a;
  margin-top: 1px;
  @media screen and (max-width: 1024px) {
    max-width: 278px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 9px;
    text-align: center;
  }
  @media screen and (max-width: 414px) {
    text-align: center;
    font-size: 14px;
  }
`
const ActionButton = styled.div`
  margin-top: 30px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 14px 24px;
  width: 250px;
  height: 48px;
  background: #4c4c4c;
  border-radius: 6px;
  font-family: Roboto, sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 1px;
  color: hsl(0, 0%, 100%);
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #4c4c4c;
  }

  @media screen and (max-width: 414px) {
    margin-left: 0;
  }
`

const Cards = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (max-width: 1024px) {
    padding-right: 24px;
    padding-left: 24px;
    max-width: none;
    a {
      width: 80%;
    }
  }
  @media screen and (max-width: 768px) {
    margin-top: 24px;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    a {
      width: 100%;
    }
  }
  @media screen and (max-width: 576px) {
    padding-right: 16px;
    padding-left: 16px;
  }
  @media screen and (max-width: 414px) {
    max-width: none;
    a {
      width: 100%;
    }
  }
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 258px;
  height: 144px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 20px;

  & .title {
    margin: 24px 0 0 16px;
    font-family: Roboto, sans-serif;
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.3px;
    color: hsl(0, 0%, 100%);
  }
  & .title101 {
    
    font-family: Roboto, sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.3px;
    color: #67c200;
  }

  & .button {
    margin: 15px 0 10px 17px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    width: 40px;
    height: 40px;
    border: 1px solid hsl(0, 0%, 100%);
    border-radius: 6px;
    background: hsla(0, 0%, 100%, 0.1) url('/images/home/card-arrow-right.svg') no-repeat center;
    transition: background 0.2s;
  }

  &:hover .button {
    background: hsla(0, 0%, 100%, 0.3) url('/images/home/card-arrow-right.svg') no-repeat center;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
  @media screen and (max-width: 414px) {
    width: 100%;
    height: 80px;
  }
`

const CardExchange = styled(Card)`
  background: #4c4c4c url('/images/home/DyorAudit-Exchange.svg');
  background-repeat: no-repeat;
  background-position: right;
`
const CardPre = styled(Card)`
  background: #4c4c4c url('/images/home/DyorAudit-Pre-Sale.svg');
  background-repeat: no-repeat;
  background-position: right;
`
const CardLiquidity = styled(Card)`
  background: #4c4c4c url('/images/home/DyorAudit-Liquidity.svg');
  background-repeat: no-repeat;
  background-position: right;
`

const MarketPlace = styled(motion.div)`
  position: absolute;
  bottom: 0;
  right: -50px;
  width: 775px;
  height: 626px;
  paddding: 50px;
  background: url(/images/home/DyorAudit-Home.png) no-repeat;
  background-size: contain;
  @media screen and (max-width: 1440px) {
    right: -66px;
    paddding: 50px;
  }
  @media screen and (max-width: 1320px) {
    width: 610px;
    height: 497px;
    right: -110px;
    paddding: 50px;
  }
  @media screen and (max-width: 1150px) {
    width: 529px;
    height: 497px;
    right: -122px;
    paddding-top: 50px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    right: 0;
    max-width: 320px;
    position: absolute;
    left: 0;
    margin-left: auto;
    margin-right: auto;
  }
  @media screen and (max-width: 414px) {
    background-size: cover;
  }
`
const Rocket = styled.div`
  font-size: 24px;
  position: relative;
  right: 10px;
  display: inline-block;
  top: -5px;
`

const EmailContainer = styled.div`
  margin-top: 16px;
  width: 450px;
  height: 103px;
  background: #ffffff;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  @media screen and (max-width: 1024px) {
    max-width: 350px;
  }
  @media screen and (max-width: 414px) {
    width: 100%;
    max-width: none;
    input {
      width: 100%;
    }
  }
`

const InputStyled = styled.div`
  position: relative;

  label {
    position: absolute;
    background: white;
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: #6c5dd3;
    top: -6px;
    left: 10px;
    width: 65px;
    text-align: center;
  }
  input {
    border: 1px solid #d2d6e5;
    width: 303px;
    &::placeholder {
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.3px;
      color: #d2d6e5;
    }
  }
  @media screen and (max-width: 1024px) {
    input {
      width: 204px;
    }
  }
`

const InputErrorStyled = styled.div`
  position: absolute;
  margin-top: 4px;
  font-family: Roboto, sans-serif;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: 0;
  color: #ed4b9e;
`

const StyledLoader = styled.div`
  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  background: url(/images/home/loader.svg);
  width: 24px;
  height: 24px;
  animation: spinner 1s linear infinite;
`

const MotionLeftColumn: FC<{
  opacityDelay?: number
  opacityDuration?: number
  xInitial?: number
  xDuration?: number
}> = ({ children, opacityDelay = 0, opacityDuration = 1.5, xInitial = 0, xDuration = 0 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: opacityDelay, duration: opacityDuration, ease: 'easeOut' }}
  >
    <motion.div initial={{ x: xInitial }} animate={{ x: 0 }} transition={{ duration: xDuration, ease: 'easeOut' }}>
      {children}
    </motion.div>
  </motion.div>
)

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const HomeNew = () => {
  const [hideLabel, setHideLabel] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleCloseModal = () => {
    closeModal()
  }

  const [openModal, closeModal] = useModal(<CongratsModal handleClose={handleCloseModal} />)

  const handleChangeEmail = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
    setEmailError(null)
  }

  const handleSubmitEmail = async () => {
    if (validateEmail(email)) {
      setIsLoading(true)
      const res = await dbMailListCreateEmail(email)
      if (res === true) {
        setEmail('')
        setEmailError(null)
        openModal()
      } else if (res === false) {
        setEmailError('Your email has already been added!')
      } else {
        setEmailError('Unknown error. Please contact support.')
      }
      setIsLoading(false)
    } else {
      setEmailError('Please enter a valid email address')
    }
  }

  return (
    <>
      <Container>
        <LeftColumn>
          {/* <MotionLeftColumn xInitial={-20} xDuration={0.8}>
            <StartingSoon>15.06.2021</StartingSoon>
          </MotionLeftColumn> */}
          <MotionLeftColumn xInitial={-60} xDuration={1}>
            <H1>DYOR Audit Exchange</H1>
          </MotionLeftColumn>
          <MotionLeftColumn xInitial={-40} xDuration={0.8}>
          <H2>The 1st Decentralized Audit Yield Farm</H2>
          </MotionLeftColumn>
          <MotionLeftColumn xInitial={-50} xDuration={1.1}>
            <H3>Token Pre-Sale dates will be announced shortly.</H3>
          </MotionLeftColumn>
          <MotionLeftColumn xInitial={-50} xDuration={1.1}>
            {/* <EmailContainer>
              <InputStyled>
                {!hideLabel && <label>Your email</label>}
                <Input
                  isWarning={!!emailError}
                  scale="lg"
                  placeholder="email@gmail.com"
                  value={email}
                  onChange={handleChangeEmail}
                  onBlur={() => setHideLabel(false)}
                  onFocus={() => setHideLabel(true)}
                  type="email"
                  name="email"
                />
                {emailError && <InputErrorStyled>{emailError}</InputErrorStyled>}
              </InputStyled>

              <ActionButton onClick={handleSubmitEmail}>{isLoading ? <StyledLoader /> : 'Send'}</ActionButton>
            </EmailContainer> */}
            <a href='#'>
              <ActionButton>Pre-Sale (Coming Soon)</ActionButton>
            </a>
          </MotionLeftColumn>
        </LeftColumn>
        <RightColumn>
          <MarketPlace
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          />
        </RightColumn>
      </Container>
      <Container>
        <Cards>
          <NextLink href='#'>
            <MotionLeftColumn opacityDelay={0.3} xInitial={-80} xDuration={1.4}>
              <CardPre>
                <div className='title'>Pre-Sale <div className='title101'>(Coming Soon)</div></div>
                <div className='button' />
              </CardPre>
            </MotionLeftColumn>
          </NextLink>
          <NextLink href='#'>
            <MotionLeftColumn opacityDelay={0.5} xInitial={-100} xDuration={1.5}>
              <CardExchange>
                <div className='title'>Liquidity<div className='title101'>(Coming Soon)</div></div>
                <div className='button' />
              </CardExchange>
            </MotionLeftColumn>
          </NextLink>
          <NextLink href='#'>
            <MotionLeftColumn opacityDelay={0.5} xInitial={-100} xDuration={1.5}>
              <CardLiquidity>
                <div className='title'>Exchange <div className='title101'>(Coming Soon)</div></div>
                <div className='button' />
              </CardLiquidity>
            </MotionLeftColumn>
          </NextLink>

        </Cards>
      </Container>
    </>
  )
}

export default HomeNew
