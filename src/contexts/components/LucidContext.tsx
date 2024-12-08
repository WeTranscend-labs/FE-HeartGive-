import { LucidContextType } from '@/types/contexts/LucidContextType';
import { createContext } from 'react';

const LucidContext = createContext<LucidContextType>(null!);

export default LucidContext;
