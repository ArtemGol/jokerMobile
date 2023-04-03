import TeamList from './teamList';

const FixturesScreen = ({route}: {route: any}) => (
  <TeamList teamId={route.params.teamId} listType="feature" />
);

export default FixturesScreen;
