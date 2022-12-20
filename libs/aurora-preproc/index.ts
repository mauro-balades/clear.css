import Lexer from "./lexer";
import Parser from "./parser"
import {Generator} from "./generator"
import { Enviroment } from "./enviroment";

import registerFunctions from "./functions";

export {default as Lexer} from "./lexer";
export {default as Parser} from "./parser";
export {Position} from "./position";
export {Source} from "./source";
export {Symbols} from "./symbols";
export {Generator} from "./generator";

export interface AuroraCSSOptions {
    source: string
};

export default class {
    private readonly content: string;

    constructor({source}: AuroraCSSOptions) {
        this.content = source;
    }

    public generate(): string {

        let lexer = new Lexer({ content: this.content });
        let lexerOutput = lexer.tokenize();

        let parser = new Parser(lexerOutput)
        let nodes = parser.getNodes();

        let enviroment = new Enviroment();
        registerFunctions(enviroment)

        let generator = new Generator(nodes, lexerOutput.source, enviroment);
        let builder = generator.generate();

        return builder.toString();
    }
}
