import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import axios from "axios";
import { API_URL } from "../../config";
import qs from 'qs';



export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const query = qs.stringify({
        populate: {
          coverImg: {
            populate: '*',
          },
          skills: {
            populate: {
              icon: {
                populate: '*',
              },
            },
          },
          user: {
            populate: '*',
          },
          'populate[bannerImage]': '*' 
        },
      }, {
        encodeValuesOnly: true,
      });

      const token = localStorage.getItem('token');

      const response = await axios.get(`${API_URL}/projects?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Ответ от Strapi:", response.data.data);
      return response.data.data;

    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (projectId
    , { rejectWithValue }) => {
    try {
      const response = await axios.get(`/projects?filters[documentId][$eq]=${projectId}&populate=*`);

      if (response.data && response.data.length > 0) {
        console.log('API Response:', response.data);
        return response.data[0];
      } else {
        throw new Error('Project not found');
      }

    } catch (error) {
      console.error('Error fetching project:', error.message || error);
      return rejectWithValue(error.response?.data?.error?.message || error.message || 'Failed to fetch project');
    }
  }
);


export const createProject = createAsyncThunk(
  'projects/createProject',
  async ({ projectData, coverImage, skills, token, userId }, { rejectWithValue }) => {
    try {
      let coverImgId = null;

      if (coverImage) {
       
        const formData = new FormData();
        formData.append('files', coverImage);
        formData.append('ref', 'upload');
        formData.append('field', 'coverImage');

        const uploadResponse = await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        coverImgId = uploadResponse?.data?.[0]?.id;

      }

      const payload = {
        data: {
          ...projectData,
          coverImg: coverImgId,
          skills: Array.isArray(skills) ? skills : [],
          user: userId && typeof userId === 'number' ? userId : null,
        },
      };
    
      const projectResponse = await api.post('/projects', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    
      return projectResponse.data;

    } catch (error) {
      console.log("Error creating project:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to create project');
    }
  }
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async ({ projectId, token }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return projectId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to delete project');
    }
  }
);

export const hideProject = createAsyncThunk('project/hide', async ({ projectId, token }) => {
  const response = await axios.put(`${API_URL}/projects/${projectId}`,
    { isHidden: true,},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  console.log("PUT", `${API_URL}/projects/${projectId}`, { isHidden: true });
  return response.data;
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    singleProject: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload || [];
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProject = action.payload.data || null;
        state.error = null;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching project';
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        const newProject = action.payload?.data;
        if (newProject) {
          const exists = state.projects.some(project => project.id === newProject.id);
          if (!exists) {
            state.projects.push(newProject);
          }
        }
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error creating project';
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.projects = state.projects.filter((project) => project.id !== deletedId);
        state.loading = false;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error deleting project';
      })
      .addCase(hideProject.fulfilled, (state, action) => {
        const updatedProject = action.payload;
        console.log(updatedProject);
        const index = state.projects.findIndex((project) => project.id === updatedProject.id);
        if (index !== -1) {
          state.projects[index] = updatedProject;
        }
      })
  },
});

export const { clearError } = projectsSlice.actions;

export const getAllProjects = (state) => state.projects.projects;
export const getProjectById = (state) => state.projects.singleProject;
export const selectError = (state) => state.projects.error;

export default projectsSlice.reducer;