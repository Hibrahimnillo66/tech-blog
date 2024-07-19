// src/pages/admin.tsx
import { useSession } from 'next-auth/react';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';

const Admin = () => {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  if (status === 'loading') return <p>Loading...</p>;

  if (!session || session.user.role !== 'admin') {
    return <p>Access Denied</p>;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      router.push('/');
    } else {
      console.error('Failed to create article');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create New Article</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default Admin;
