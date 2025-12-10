/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);
 
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
 
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
}
 
// init Materialize
M.AutoInit();

document.addEventListener('DOMContentLoaded', function() {
        const elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {
          edge: 'left',
          draggable: true
        });

        const dropdownElems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(dropdownElems, {
          hover: true,
          coverTrigger: false
        });

        const tabsEl = document.querySelector('.tabs');
        const tabsInstance = M.Tabs.init(tabsEl, {});
        tabsInstance.select("test3");
      });

      function searchArtists() {
        const query = document.getElementById('artistInput').value.trim();
        const resultsContainer = document.getElementById('resultsContainer');
        const loading = document.getElementById('loading');
        
        if (!query) {
          alert('Please enter an artist name');
          return;
        }
        
        loading.style.display = 'block';
        resultsContainer.innerHTML = '';
        
        // URL de la API con JSON (como el ejemplo de tu profesor)
        const apiUrl = `https://musicbrainz.org/ws/2/artist?query=${encodeURIComponent(query)}&fmt=json`;
        
        fetch(apiUrl)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network error.');
              }
              return response.json();
          })
          .then(data => {
              loading.style.display = 'none';
              
              if (!data.artists || data.artists.length === 0) {
                  resultsContainer.innerHTML = '<p>No artists found.</p>';
                  return;
              }
              
              let html = `<h5>Found ${data.artists.length} artists:</h5>`;
              
              // Iterar artistas 
              for (const artist of data.artists) {
                  html += `
                    <div class="card" style="margin: 10px 0; padding: 10px; border: 1px solid #ccc;">
                      <h6>${artist.name} ${artist.disambiguation ? `(${artist.disambiguation})` : ''}</h6>
                      <p><strong>Type:</strong> ${artist.type || 'N/A'} | 
                         <strong>Country:</strong> ${artist.country || 'N/A'} |
                         <strong>Active:</strong> ${artist['life-span']?.ended ? 'No' : 'Yes'}
                      </p>
                    </div>
                  `;
              }
              
              resultsContainer.innerHTML = html;
          })
          .catch(error => {
              loading.style.display = 'none';
              console.error('Error fetching data:', error);
              resultsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
          });
      }