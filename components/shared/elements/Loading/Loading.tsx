import { Puff } from 'react-loader-spinner'
import styles from './styles/styles.module.css';

export const Loading = () => {

  return (
    <div className={styles['loading']}>
      <Puff
          height="80"
          width="80"
          radius={1}
          color="#4fa94d"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
      />
    </div>
  );
};
