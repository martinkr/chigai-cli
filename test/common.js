"use strict";

global.chai = require("chai");
global.chai.should();

global.sinon = require("sinon");
global.sinonChai = require("sinon-chai");
global.chai.use(global.sinonChai);

global.expect = global.chai.expect;

global.ENV = "TEST_CLIRUN";
