const path = require("path");
const protoLoader = require("@grpc/proto-loader");
const grpc = require("grpc");

// store proto path
const PROTO_PATH = path.resolve(__dirname, "./protos/hw2.proto");

// create package definition
const pd = protoLoader.loadSync(PROTO_PATH);
const loaded = grpc.loadPackageDefinition(pd);
// store package from proto file
const hello_proto = loaded.helloworld;

function main() {
  // start client and create credentials
  const client = new hello_proto.Greeter(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );
  // CLI prompt or hard code the variable for the message "name": "string"
  let user;
  if (process.argv.length >= 3) {
    user = process.argv[2];
  } else {
    user = "world";
  }
  const meta = new grpc.Metadata();
  meta.add("testing", "metadata is working");
  
  // unary
  client.sayHello({ name: user }, meta, function(err, response) {
    console.log("Greeting:", response.message);

  });
  // server side streaming
  const call = client.sayHellos({ name: user }, meta);
  call.on("data", data => {
    console.log("server streaming messages:", data);
  });

  // client side streaming
  const stream = client.sayHelloCs(meta, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response);
    }
    // client.close();
  });
  stream.write({ name: "hello first stream" });
  stream.write({ name: "hello 2nd stream" });
  stream.end({ name: "hello end stream" });

  // bidi streaming
  const streamBidi = client.sayHelloBidi(meta);
  streamBidi.on("error", console.error);
  streamBidi.on("data", console.log);
  streamBidi.on("end", () => client.close());

  streamBidi.write({ name: "hello bidi stream 1" });
  streamBidi.end({ name: "hello bidi stream 2" });
}
main();
