import Head from 'next/head';
import styles from './layout.module.css';
import utilStyles from '@styles/utils.module.css';
import Link from 'next/link';
export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Rise</title>
      </Head>
      <main className={styles.main}>
        <img src="logo.png" alt="logo" style={{width: "100px",height:"100px"}} />
        <hr />
        <div className={styles.container}>
          {children}
        </div>
      </main>
      
    </>

  );
}