import styles from "./styles.module.scss";
import Head from "next/head";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Creating a monorepo with Learn & Yarn Workspaces</strong>
            <p>
              in this guide, you will learn how to create a Monorepo to manage
              multiple packages with a shared...
            </p>
          </a>
          <a>
            <time>12 de março de 2021</time>
            <strong>Creating a monorepo with Learn & Yarn Workspaces</strong>
            <p>
              in this guide, you will learn how to create a Monorepo to manage
              multiple packages with a shared...
            </p>
          </a>
          <a>
            <time>12 de março de 2021</time>
            <strong>Creating a monorepo with Learn & Yarn Workspaces</strong>
            <p>
              in this guide, you will learn how to create a Monorepo to manage
              multiple packages with a shared...
            </p>
          </a>
          <a>
            <time>12 de março de 2021</time>
            <strong>Creating a monorepo with Learn & Yarn Workspaces</strong>
            <p>
              in this guide, you will learn how to create a Monorepo to manage
              multiple packages with a shared...
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
