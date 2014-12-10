/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 */

var baudio = require('baudio');

var oscilot = require('./lib');

var b = baudio(oscilot.sine);

b.play();
