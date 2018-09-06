//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.
//
// Microsoft Bot Framework: http://botframework.com
//
// Bot Framework Emulator Github:
// https://github.com/Microsoft/BotFramwork-Emulator
//
// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

import {
  azureArmTokenDataChanged,
  invalidateArmToken,
  ArmTokenData,
  AzureAuthAction,
} from '../action/azureAuthActions';
import azureAuth, { AzureAuthState } from './azureAuthReducer';

describe('Azure auth reducer tests', () => {
  let startingState: AzureAuthState;

  beforeEach(() => {
    startingState = {
      access_token: null,
      persistLogin: false
    };
  });

  it('should return unaltered state for non-matching action type', () => {
    const emptyAction = { type: null, payload: undefined };
    const endingState = azureAuth(startingState, emptyAction);
    expect(endingState).toEqual(startingState);
  });

  it('should change auth data', () => {
    const action = azureArmTokenDataChanged('someKey');
    const state = azureAuth(startingState, action);
    expect(state.access_token).toEqual('someKey');
  });

  it('should remove access_token on invalidate', () => {
    const action = invalidateArmToken();
    const state = azureAuth(startingState, action);
    expect(state.access_token).toMatch(/^invalid__/);
  });
});
