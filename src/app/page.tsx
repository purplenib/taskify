import Link from 'next/link';

export default function Home() {
  return (
    <div className="">
      home
      <Link href="/mydashboard">
        <button type="button">My Dashboard</button>
      </Link>
    </div>
  );
}
