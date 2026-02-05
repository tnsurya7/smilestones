'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function AdminPageHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 mb-6">
      <button
        onClick={() => router.push('/admin/dashboard')}
        className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <h1 className="text-xl font-semibold text-gray-900">
        {title}
      </h1>
    </div>
  );
}
