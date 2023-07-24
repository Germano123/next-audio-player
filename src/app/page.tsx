import styles from '../styles/page.module.css';
import AudioPlayer from '../components/audioplayer';

export default function Home() {
  return (
    <main className={styles.main}>
      <AudioPlayer />
    </main>
  )
}
