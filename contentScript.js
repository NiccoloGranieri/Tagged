// Function to add the tag
function addTag() {
    const imageContainers = document.querySelectorAll('.web_ui__Image__image.web_ui__Image__medium.web_ui__Image__rounded.web_ui__Image__scaled.web_ui__Image__cover');
  
    imageContainers.forEach(container => {
      // Check if the tag has already been added
      if (!container.nextSibling || !container.nextSibling.classList.contains('custom-tag')) {
        const tag = document.createElement('div');
        tag.textContent = 'Tag';
        tag.style.backgroundColor = '#ff0000';
        tag.style.color = 'white';
        tag.style.padding = '5px';
        tag.style.borderRadius = '5px';
        tag.style.marginTop = '5px';
        tag.style.textAlign = 'center';
        tag.className = 'custom-tag';
  
        container.parentNode.insertBefore(tag, container.nextSibling);

        // Add click event listener to each tag
        tag.addEventListener('click', function(event) {
            // Prevent the click from doing anything else (like navigating)
            event.stopPropagation();
            // Call a function to show the dropdown menu for this tag
            showDropdownMenuForTag(tag);
        });
    
        }

    });
  }
  
  // Create an observer instance
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (!mutation.addedNodes) return;
  
      addTag(); // Try to add tags whenever nodes are added to the document
    });
  });
  
  // Configuration of the observer:
  const config = {
    childList: true,
    subtree: true
  };
  
  // Start observing the body for added nodes
  observer.observe(document.body, config);
  
  // Initial attempt to add tags
  addTag();
  
  function showDropdownMenuForTag(tag) {
    // Check if a dropdown is already open and remove it if so
    const existingDropdown = document.querySelector('.tag-dropdown');
    if (existingDropdown) {
      existingDropdown.remove();
    }
  
    // Create a dropdown element
    const dropdown = document.createElement('div');
    dropdown.className = 'tag-dropdown';
    dropdown.style.position = 'absolute';
    dropdown.style.left = `${tag.getBoundingClientRect().left}px`; // Position horizontally near the tag
    dropdown.style.top = `${tag.getBoundingClientRect().bottom + 5}px`; // Position vertically just below the tag
    dropdown.style.backgroundColor = '#ffffff';
    dropdown.style.border = '1px solid #ddd';
    dropdown.style.padding = '10px';
    dropdown.style.borderRadius = '5px';
    dropdown.style.boxShadow = '0px 8px 16px 0px rgba(0,0,0,0.2)';
  
    // Add options to the dropdown for changing text and color
    dropdown.innerHTML = `
      <div>Change Tag Text:</div>
      <input type="text" id="tag-text-input" value="${tag.textContent}"><br>
      <div>Change Tag Color:</div>
      <select id="tag-color-select">
        <option value="#ff0000">Red</option>
        <option value="#00ff00">Green</option>
        <option value="#0000ff">Blue</option>
      </select>
      <button id="update-tag-btn">Update Tag</button>
    `;
  
    // Append the dropdown to the document body to show it
    document.body.appendChild(dropdown);
  
    // Add an event listener to the update button inside the dropdown
    document.getElementById('update-tag-btn').addEventListener('click', () => {
      const newText = document.getElementById('tag-text-input').value;
      const newColor = document.getElementById('tag-color-select').value;
      // Update the tag with the new text and color
      tag.textContent = newText;
      tag.style.backgroundColor = newColor;
      // Remove the dropdown after update
      dropdown.remove();
    });
  }
