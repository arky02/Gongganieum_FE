import { useSearchParams } from 'next/navigation';

export default function Home() {
  const params = useSearchParams();
  const code = params.get('redirect');
  console.log(code);
  return;
}
