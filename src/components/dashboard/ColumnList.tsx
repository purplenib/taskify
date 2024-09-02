import Column from './Column';

export default function ColumnList() {
  return (
    <div className="mx-auto flex min-h-[100vh] max-w-[400px] flex-col md:mx-0 md:max-w-full xl:flex-row">
      <Column />
      <Column />
      <Column />
    </div>
  );
}
