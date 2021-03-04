import app from './app.js';

import { PORT } from './Config/env.js';

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

