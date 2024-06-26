import './profile.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TransactionBalance from '../../../shared/components/transaction-balance/transaction-balance.tsx';
import { getFirstName, getLastName, getToken } from '../../store/user-selectors.ts';
import { useUpdateUser } from '../../../shared/custom-hooks/useUpdateUser.tsx';
import Loader from '../../../shared/components/loader/loader.tsx';
import Login from '../login/login.tsx';
import { hasNoSpecialChars, hasNotOnlySpaces, isNotEmpty, isNotTooLong } from '../../../shared/utils/string-utils.ts';

export default function Profile() {
  const transactions = [
    { id: 1, title: 'Argent Bank Checking (x8349)', amount: '$2,082.79', description: 'Available Balance' },
    { id: 2, title: 'Argent Bank Savings (x6712)', amount: '$10,928.42', description: 'Available Balance' },
    { id: 3, title: 'Argent Bank Credit Card (x8349)', amount: '$184.30', description: 'Current Balance' },
  ];

  const token = useSelector(getToken);
  const firstName = useSelector(getFirstName);
  const lastName = useSelector(getLastName);

  const [isEditing, setIsEditing] = useState(false);
  const [userUpdateInfosState, setUserUpdateInfosState] = useState({ firstName, lastName });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);


  const { updateUser, isLoading } = useUpdateUser();

  // on a click, change the isEditing state to true or false to show the form or not.
  const handleClick = () => {
    setIsEditing(!isEditing);
  };

  // if the user is editing, check if the inputs are valid to enable the submit button
  useEffect(() => {
      const validateString = (str: string) => {
        return (
          isNotTooLong(str, 20) &&
          isNotEmpty(str) &&
          hasNoSpecialChars(str) &&
          hasNotOnlySpaces(str)
        );
      };
      setIsSubmitDisabled((!validateString(userUpdateInfosState.firstName || '') || !validateString(userUpdateInfosState.lastName || '')));
    },
    [userUpdateInfosState.firstName, userUpdateInfosState.lastName]);

  // always update the userUpdateInfosState when the firstName or lastName from store changes
  useEffect(() => {
      setUserUpdateInfosState({ firstName, lastName });
    },
    [firstName, lastName]);


  // On submit, if the user has empty value we use store values before sending update.
  // Then, close the form.
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setUserUpdateInfosState({ firstName, lastName });
    const userParams = { firstName: userUpdateInfosState.firstName, lastName: userUpdateInfosState.lastName };
    updateUser(token, userParams).then(() => setIsEditing(false));
  };

  return token ? (
    <main className="main bg-light">
      {isLoading ? <Loader /> : null}
      <div className="header">
        {isEditing ? (
          <div>
            <h1>Welcome back</h1>
            <form>
              <input name={'firstName'} className={'edit-input'} value={userUpdateInfosState.firstName}
                     onChange={e => setUserUpdateInfosState(prev => ({ ...prev, firstName: e.target.value }))} />
              <input name={'lastName'} className={'edit-input'} value={userUpdateInfosState.lastName}
                     onChange={e => setUserUpdateInfosState(prev => ({ ...prev, lastName: e.target.value }))} />
            </form>
            <div>
              <button
                onClick={handleSubmit}
                className="edit-button save"
                type={'submit'}
                disabled={isSubmitDisabled}>
                Save
              </button>
              <button onClick={handleClick} className="edit-button" type={'button'}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1>
              Welcome back
              <br />
              {firstName} {lastName}!
            </h1>
            <button onClick={handleClick} className="edit-button">
              Edit Name
            </button>
          </div>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      {transactions.map(transaction => (
        <TransactionBalance key={transaction.id} title={transaction.title} amount={transaction.amount}
                            description={transaction.description} />
      ))}
    </main>
  ) : (
    <Login />
  );
}

