import {expect} from "chai";
import supertest from "supertest";
import {getVoluntaryExits} from "../../../../../../src/api/rest/controllers/beacon/pool/getVoluntaryExits";
import {generateEmptySignedVoluntaryExit} from "../../../../../utils/attestation";
import {urlJoin} from "../../utils";
import {BEACON_PREFIX, api, restApi} from "../index.test";

describe("rest - beacon - getVoluntaryExits", function () {
  it("should succeed", async function () {
    api.beacon.pool.getVoluntaryExits.withArgs().resolves([generateEmptySignedVoluntaryExit()]);
    const response = await supertest(restApi.server.server)
      .get(urlJoin(BEACON_PREFIX, getVoluntaryExits.url))
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
    expect(response.body.data.length).to.be.equal(1);
  });
});
