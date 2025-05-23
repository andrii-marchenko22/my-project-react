interface UserProps {
  onUser: (value: string) => void;
}

export default function Input({ onUser }: UserProps) {
  //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();

  //     const form = event.currentTarget;
  //     const formData = new FormData(form);
  //     const username = formData.get('username');
  //     console.log('Username:', username);
  //     form.reset();

  const handleSubmit = (formData: FormData) => {
    const username = formData.get('username') as string;
    onUser(username);
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="username" defaultValue="John Doe" />
      <button type="submit">Submit</button>
    </form>
  );
}
