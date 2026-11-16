import CreativeJourney from "./components/CreativeJourney";
import Experience from "./components/Experience";
import Header from "./components/Header";
import JobTitle from "./components/JobTitle";
import MyClients from "./components/MyClients";
import SelectedWork from "./components/SelectedWork";

export default function Home() {
  return (
    <main className='flex w-full flex-col overflow-x-hidden'>
      <Header />
      <JobTitle />
      <CreativeJourney />
      <SelectedWork />
      <Experience />
      <MyClients />
    </main>
  );
}
