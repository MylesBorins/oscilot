/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 */

'use strict';

var pi = Math.PI;
var tau = 2 * pi;

function sine(t) {
  var x = Math.sin(tau * 220 * t);
  return x;
}

module.exports = sine;
