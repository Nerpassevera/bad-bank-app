import React from "react";
import Card from "../context.js";
import { UserContext } from "../index.js";

export default function Withdraw() {
  const [show, setShow] = React.useState(false);
  const [withdraw, setWithdraw] = React.useState('');
  const [status, setStatus] = React.useState('Please log in for managing your account balance');
  const ctx = React.useContext(UserContext);

  function validateUser(user){
      if (ctx.loggedUser && !show) {
        setShow(true);
        setStatus('');  
              
        if (!user.balance){
         user.balance = 0;
       }
      }
  }

  function clearForm() {
    setWithdraw(0);
  }


  
  var user = ctx.users.filter( item => item.email === ctx.loggedUser)[0]; 
  validateUser(user);

  
  function handleWithdraw() {
    if (user.balance >= withdraw) {
      user.balance = user.balance - Number(withdraw);
      console.log(user, typeof(user));
      clearForm();
    }
    else {
      setStatus('Insufficient funds');
      setTimeout((()=> setStatus('')), 3500);
    }
  }

  

  return (
    <Card
      bgcolor="info"
      header="Withdraw"
      status={status}
      
      body={
        show ? (
          <>
            <p style={{width: "50%", float: "left"}}>Balance</p>
            <p style={{width: "50%", float: "right"}}>${user ? user.balance : NaN}</p>

            Withdraw amount
            <input
              type="number"
              className="form-control"
              id="Withdraw"
              placeholder="Enter withdraw amount"
              value={withdraw}
              min={0}
              onChange={ (e) => setWithdraw(e.currentTarget.value)}
              />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              disabled={withdraw <= 0}
              onClick={handleWithdraw}
            >
              Withdraw
            </button>
          </>
        ) : (
          <>
            <h5>Important!</h5>

          </>
        )
      }
    />
  );
}