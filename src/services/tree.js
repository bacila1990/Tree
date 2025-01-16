import axios from 'axios';

const api = axios.create({
  baseURL: 'https://test.vmarmysh.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const treeName = '%7BC9232B85-AD10-459C-A44F-70CA30C60E5F%7D';

export const fetchFolders = async () => {
  const response = await api.post(`/api.user.tree.get?treeName=${treeName}`);
  return response.data;
};

export const createFolder = async (parentNodeId, nodeName) => {
  const response = await api.post(`/api.user.tree.node.create?treeName=${treeName}&parentNodeId=${parentNodeId}&nodeName=${nodeName}`);
  return response.data;
};

export const renameFolder = async (nodeId, newNodeName) => {
  const response = await api.post(`/api.user.tree.node.rename?treeName=${treeName}&nodeId=${nodeId}&newNodeName=${newNodeName}`);
  return response.data;
};

export const deleteFolder = async (nodeId) => {
  const response = await api.post(`/api.user.tree.node.delete?treeName=${treeName}&nodeId=${nodeId}`);
  return response.data;
};
