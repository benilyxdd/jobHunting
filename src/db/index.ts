import { MongoClient, ServerApiVersion } from "mongodb";
import { credentails } from "../configs/db.config";

const uri =
	"mongodb+srv://job.54sebwh.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority";

const client = new MongoClient(uri, {
	sslKey: credentails,
	sslCert: credentails,
	serverApi: ServerApiVersion.v1,
});

(async () => {
	try {
		await client.connect();
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
	}
})();

export default client;
