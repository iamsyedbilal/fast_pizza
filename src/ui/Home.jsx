import CreateUser from '../features/user/CreateUser'

function Home() {
  return (
    <div className="my-10 px-4 text-center sm:my-16 sm:px-6">
      <h1 className="mb-4 text-3xl font-semibold">
        The best pizza.
        <br />
        <span className="text-emerald-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  )
}

export default Home
