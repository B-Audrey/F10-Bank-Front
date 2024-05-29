import './profile.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import WrongPage from '../../shared/components/wrong-page/wrong-page.tsx';
import TransactionBalance from '../../shared/components/transaction-balance/transaction-balance.tsx';
import { getToken, getUser } from '../store/user-selectors.ts';
import { useUpdate } from '../../shared/custom-hooks/useUpdate.tsx';

export default function Profile() {
  const user = useSelector(getUser);
  const token = useSelector(getToken);

  const transactions = [
    { id: 1, title: 'Argent Bank Checking (x8349)', amount: '$2,082.79', description: 'Available Balance' },
    { id: 2, title: 'Argent Bank Savings (x6712)', amount: '$10,928.42', description: 'Available Balance' },
    { id: 3, title: 'Argent Bank Credit Card (x8349)', amount: '$184.30', description: 'Current Balance' },
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [firstNameToUpdate, setFirstNameToUpdate] = useState('');
  const [lastNameToUpdate, setLastNameToUpdate] = useState('');
  const [isSavingEnabled, setIsSavingEnabled] = useState(true);

  const { updateUser } = useUpdate();

  const handleClick = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    if (isEditing) {
      setFirstNameToUpdate(user.firstName);
      setLastNameToUpdate(user.lastName);
    }
  }, [isEditing, user]);

  useEffect(() => {
    if (firstNameToUpdate === user.firstName && lastNameToUpdate === user.lastName) {
      setIsSavingEnabled(false);
    } else {
      setIsSavingEnabled(true);
    }
  }, [firstNameToUpdate, lastNameToUpdate, user]);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!firstNameToUpdate) {
      setFirstNameToUpdate(user.firstName);
    }
    if (!lastNameToUpdate) {
      setLastNameToUpdate(user.lastName);
    }
    const userParams = { firstName: firstNameToUpdate, lastName: lastNameToUpdate };
    updateUser(token, userParams);
    setIsEditing(false);
  };

  return user.id ? (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <div>
            <h1>Welcome back</h1>
            <form>
              <input className={'edit-input'} value={firstNameToUpdate} onChange={e => setFirstNameToUpdate(e.target.value)} />
              <input className={'edit-input'} value={lastNameToUpdate} onChange={e => setLastNameToUpdate(e.target.value)} />
            </form>
            <div>
              <button onClick={handleSubmit} className="edit-button save" type={'submit'} disabled={!isSavingEnabled}>
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
              {user.firstName} {user.lastName}!
            </h1>
            <button onClick={handleClick} className="edit-button">
              Edit Name
            </button>
          </div>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      {transactions.map(transaction => (
        <TransactionBalance key={transaction.id} title={transaction.title} amount={transaction.amount} description={transaction.description} />
      ))}
    </main>
  ) : (
    <WrongPage />
  );
}
