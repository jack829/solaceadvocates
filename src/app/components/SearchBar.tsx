
type Props = {
  search: (term: string) => void
  reset: () => void
}

export default function SearchBar({ search, reset } : Props) {

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = e.currentTarget.value;
    search(searchTerm);
  }

  return (
    <section className='w-full my-4'>
      <input
        type='text'
        onChange={onChangeInput}
        placeholder="Search for an Advocate"
        className='w-full md:w-1/3 bg-white mb-2 py-2 px-4 md:mr-4 border border-current rounded'
      />
      <button onClick={reset} className='rounded bg-slate-500 text-white px-2 py-1 md:px-4 md:py-2'>Reset</button>
    </section>
  );
}
