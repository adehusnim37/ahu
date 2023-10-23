import { Test, TestingModule } from "@nestjs/testing";
import { APHController } from "./aph.controller";

describe("UserController", () => {
  let controller: APHController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [APHController]
    }).compile();

    controller = module.get<APHController>(APHController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
