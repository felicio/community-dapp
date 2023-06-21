import protons from 'protons'

const proto = protons(`
message WakuVote {
  string address = 1;
  string vote = 2;
  bytes  sntAmount = 3;
  string sign = 4;
  uint32 timestamp = 5;
  uint64 roomID = 6;
}

message WakuFeature {
  string voter = 1;
  bytes  sntAmount = 2;
  string community = 3;
  uint32 timestamp = 4;
  string sign = 5;
}
`)

export default proto
