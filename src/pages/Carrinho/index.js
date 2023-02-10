import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useContext, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Voltar, TotalContainer, PagamentoContainer } from './styles';
import Produto from 'components/Produto';
import { useCartContext } from 'common/context/Cart';
import { usePaymentContext } from 'common/context/Payment';
import { UserContext } from 'common/context/User';

function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { saldo } = useContext(UserContext);
  const { cart, totalPriceInCart, checkout } = useCartContext();
  const { paymentMethods, selectedPayment, changePaymentMethod } = usePaymentContext();
  const history = useHistory();

  // update wallet only when saldo or totalPriceInCart changes
  const walletUpdated = useMemo(() => saldo - totalPriceInCart, [saldo, totalPriceInCart]) ;

  return (
    <Container>
      <Voltar onClick={() => history.goBack()} />
      <h2>
        Carrinho
      </h2>
      {cart.map(item => (
        <Produto
          {...item}
          key={item.id}
        />
      ))}
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select
          value={selectedPayment.id}
          onChange={(e) => changePaymentMethod(e.target.value)}
        >
          {paymentMethods.map(payment => (
            <MenuItem key={payment.id} value={payment.id}>{payment.name}</MenuItem>
          ))}
        </Select>
      </PagamentoContainer>
      <TotalContainer>
        <div>
          <h2>Total no Carrinho: </h2>
          <span>R$ {totalPriceInCart.toFixed(2)}</span>
        </div>
        <div>
          <h2> Saldo: </h2>
          <span> R$ {Number(saldo).toFixed(2)}</span>
        </div>
        <div>
          <h2> Saldo Total: </h2>
          <span> R$ {walletUpdated.toFixed(2)}</span>
        </div>
      </TotalContainer>
      <Button
        onClick={() => {
          checkout();
          setOpenSnackbar(true);
        }}
        disabled={walletUpdated < 0 || cart.length === 0}
        color="primary"
        variant="contained"
      >
        Comprar
      </Button>
      <Snackbar
        anchorOrigin={
          {
            vertical: 'top',
            horizontal: 'right'
          }
        }
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
        >
          Compra feita com sucesso!
        </MuiAlert>
      </Snackbar>
    </Container>
  )
}

export default Carrinho;