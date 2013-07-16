/* JavaScript
 * Department of Permitting Services Complaint App
 *
 * initialises complaint app namespace
 * namespace: uses general function for adding properties
 * modules: see respective files for device,
 * submit, and retrieve
 *
 * 03-05-2013 alisa.ky.chen@gmail.com */

/*** global object; namespace ***/
var COMPLAINTAPP = {};

/*** functions ***/
/* general purpose namespace function
 * creates property only if it is currently undefined
 * Source: "JavaScript Patterns" by Stoyan Stefanov (O'Reilly) 2010 */
COMPLAINTAPP.namespace = function (strNamespace) {
  var parent = COMPLAINTAPP,
      arrProp = strNamespace.split("."),
      lenArrProp,
      i;

  // strip redundant leading global
  if (arrProp[0] === "COMPLAINTAPP") {
    arrProp = parts.slice[i];
  }

  lenArrProp = arrProp.length;
  for (i = 0; i < lenArrProp; i += 1) {
    if (typeof parent[arrProp[i]] === "undefined") {
      // create property
      parent[arrProp[i]] = {};
    }
    parent = parent[arrProp[i]];
  }
  
  return parent;
}

/*** variables ***/

/*** modules ***/
COMPLAINTAPP.module = {
  //device: {},       // mobile-complaint-device.js
};