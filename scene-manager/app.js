import { fetchData } from './services/fetchData.js';

document.addEventListener("DOMContentLoaded", async () => {
    const treeContainer = document.getElementById("tree");
    let treeData;

    const initializeApp = async () => {
        try {
            treeData = await fetchData();
            createTreeMenu(treeData);
        } catch (error) {
            console.error('Initialization error:', error.message);
        }
    };

    const createTreeMenu = (element, parent = null) => {
        const listItem = document.createElement("div");
        listItem.textContent = element.type;
        listItem.classList.add("tree-node");
        listItem.addEventListener("click", (event) => {
            event.stopPropagation();
            showProperties(element);
        });

        if (element.children && element.children.length > 0) {
            const sublist = document.createElement("div");
            sublist.classList.add("sublist");
            element.children.forEach(child => createTreeMenu(child, sublist));
            listItem.appendChild(sublist);
        }

        parent ? parent.appendChild(listItem) : treeContainer.appendChild(listItem);
    };

    const findNodeData = (node, targetText) => {
        if (node.type === targetText) {
            return node;
        }

        if (node.children && node.children.length > 0) {
            for (const child of node.children) {
                const result = findNodeData(child, targetText);
                if (result) {
                    return result;
                }
            }
        }

        return null;
    };

    const showProperties = (selectedObject) => {
        const propertiesPanel = document.getElementById("panel");
        propertiesPanel.innerHTML = "";

        const displayProperties = (obj) => {
            for (const [key, value] of Object.entries(obj)) {
                const propertyRow = document.createElement("div");
                propertyRow.innerHTML = `<span class="property-key">${key}:</span> <span class="property-value">${value}</span>`;

                if (typeof value === "object" && value !== null) {
                    propertyRow.classList.add("tree-node");
                    propertyRow.addEventListener("click", (event) => {
                        event.stopPropagation();
                        showProperties(value);
                    });
                }

                propertiesPanel.appendChild(propertyRow);
            }
        };

        displayProperties(selectedObject);
        propertiesPanel.style.display = "block";
    };

    initializeApp();

    document.addEventListener("click", (event) => {
        const target = event.target;
        if (target.classList.contains("tree-node")) {
            const nodeText = target.textContent.trim();
            const clickedNode = findNodeData(treeData, nodeText);
            if (clickedNode) {
                showProperties(clickedNode);
            }
        }
    });
});
