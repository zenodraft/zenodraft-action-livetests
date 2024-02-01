Notes

1. running the `live-testing.yml` workflow creates tags and releases in this repository. They can be discarded once the correct operation of the workflow has been verified.
1. Zenodo doesn't like it when you make depositions with the same content. The errors you'll when this happens are 500 INTERNAL SERVER ERROR


Debugging the zenodraft workflow from the sibling repo can be difficult because it involves
1. code from zenodraft/zenodraft
1. code from zenodraft/action
1. code from zenodraft/zenodraft-live-testing
1. GitHub action environment
1. Zenodo or Zenodo Sandbox API

Here are some steps to make it a bit easier. Assuming the three repos have been checked out locally,

1. set `zenodraft` to a development branch, e.g. `lib-dev`
1. set `action` to a development branch, e.g `action-dev`
1. keep `zenodraft-live-testing` on its `main` branch to make manually triggering its workflows a bit easier
1. do your development on `zenodraft`. When ready to test,
1. run `npm run all` in your checked out copy of `zenodraft` to transpile and generate the distributable code in `zenodraft/dist/lib`
1. check that `zenodraft`'s test still pass by running `npm run test`
1. check that the library is useable by importing the library into `node`
1. check that the cli works as expected (see the repo's developer notes)
1. copy the code from `zenodraft/dist/lib` to `action`'s `node_modules/zenodraft/dist/lib`, for example using `meld`
1. add, commit, push the update to `action`'s `action-dev` branch
1. in `zenodraft-live-testing`, check that the `debug.yml` workflow is using the correct branch (i.e. `action-dev`) from `action`
1. check that `zenodraft-live-testing` doesn't have any tags or releases (releasing the same content twice will fail the workflow)
1. check the state of depositions on Zenodo or Zendo Sandbox, whichever is the publishing target
1. verify that GitHub knows about the access tokens, renew the tokens if need be by generating new ones on Zenodo [Sandbox] and copy pasting them into `zenodraft-live-testing` repo's settings.
1. trigger the `debug.yml` workflow from `zenodraft-live-testing` repo

Additionally, it is sometimes useful to manually craft requests to send to Zenodo. An easy way to do this is with Postman.

TODO:

1. investigate: since clearing the metadata amounts to writing minimal metadata, there may be failures due to metadata that is exactly equal which Zenodo might not like. Could possibly be avoided by having zenodraft insert a `version` with a datetime of now.
