import axios from 'axios';

// instanca axios-a za potrebe Fipugram backenda
let Service = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
});

// naš objekt za sve pozive koji se dotiču `Post`ova
let Posts = {
    
    Comments: {
        async add(postId, comment) {
        await Service.post(`/posts/${postId}/comments/`, comment);
        },
        async delete(postId, commentId) {
            await Service.delete(`/posts/${postId}/comments/${commentId}`);
            }

        },//comments
        add(post) {
            return Service.post('/posts', post);
        },
    async getOne(id) {
        let response = await Service.get(`/posts/${id}`);

        let doc = response.data;

        return {
            id: doc._id,
            url: doc.source,
            email: doc.createdBy,
            title: doc.title,
            posted_at: Number(doc.postedAt),
            // dodajemo da čita i `comments` te `_id` pretvara u `id`
            comments: (doc.comments || []).map((c) => {
            c.id = c._id;
            delete c._id;
            return c;
            }),
        };
    },
    async getAll(searchTerm) {
        let options = {};

        if (searchTerm) {
            options.params = {
                _any: searchTerm,
            };
        }

        let response = await Service.get('/posts', options);
        return response.data.map((doc) => {
            return {
                id: doc._id,
                url: doc.source,
                email: doc.createdBy,
                title: doc.title,
                posted_at: Number(doc.postedAt),
            };
        });
    },
};

export { Service, Posts }; // exportamo Service za ručne pozive ili Posts za metode.
