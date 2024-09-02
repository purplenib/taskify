import Link from 'next/link';

export default function Home() {
  return (
    <div className="font-3xl-32px-bold">
      hello
      <Link href="/mydashboard">나의 대시보드</Link>
    </div>
  );
}
