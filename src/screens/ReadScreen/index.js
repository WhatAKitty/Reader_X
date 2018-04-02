import React, { Component, PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  ActionSheetIOS,
  AsyncStorage,
  LayoutAnimation,
  TouchableWithoutFeedback
} from 'react-native';

import { Icon, Button } from 'react-native-elements';
import { HeaderBackButton } from 'react-navigation';
import { Pages } from '../../components/ReactNativePages';
import { iOSUIKitTall, iOSColors } from 'react-native-typography'

import BottomNav from './BottomNav';
import Page from '../../components/Page';
import EmptyView from '../../components/EmptyView';

import { content, chapterList } from '../../services/book';
import getRealm, { SortDescriptor } from '../../models';
import constants from '../../utils/constants';

import styles from './index.style';
import { getTheme, moonTheme, defaultTheme } from './ReaderTheme.style';

const { STATUS } = constants;

class ReadScreen extends PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => {
    let barShow = navigation.state.params.barShow ? {} : { header: null };
    return {
      ...barShow,
      title: '',
      headerStyle: styles.header.self,
      headerLeft: (
        <HeaderBackButton
          title='返回'
          tintColor={'#fff'}
          onPress={() => {
            navigation.goBack(null);
          }}
        />
      ),
      headerRight: (
        // <View style={styles.common.navRightContainer}>
        //   <Icon
        //     containerStyle={styles.common.navButtonContainer}
        //     name='arrow-downward'
        //     type='MaterialIcons'
        //     color={styles.common.navButton.color}
        //     underlayColor={styles.common.navButton.underlayColor}
        //     onPress={() => { tht.downChoose(); }}
        //   />
        //   <Icon
        //     containerStyle={styles.common.navButtonContainer}
        //     name='bubble-chart'//
        //     type='MaterialIcons'
        //     color={styles.common.navButton.color}
        //     underlayColor={styles.common.navButton.underlayColor}
        //     onPress={() => { tht.sourceChoose(); }}
        //   />
        //   <Icon
        //     containerStyle={styles.common.navButtonContainer}
        //     name='more-horiz'//bubble-chart
        //     type='MaterialIcons'
        //     color={styles.common.navButton.color}
        //     underlayColor={styles.common.navButton.underlayColor}
        //     onPress={() => { }}
        //   />
        // </View>
        <View></View>
      ),
      tabBarVisible: false,
    };
  }

  state = {
    status: STATUS.READY,
    chapters: [],
    chapterTitle: '加载中',
    chapterRawContent: undefined,
    chapterPages: [],
    currentChapter: 0,
    progress: 0,
    chapterStyles: {},
    barShow: false,
    theme: null,
  };

  componentDidMount() {
    this._init();
  }

  renderNone() {
    return (
      <EmptyView
        tip="访问失败"
        subTip="重新加载"
      />
    );
  }

  renderLoading() {
    return (
      <EmptyView
        tip="正在加载中"
      />
    );
  }

  renderChapterPage(pageLines = [], pageIndex) {
    const { chapterStyles, theme } = this.state;
    return (
      <TouchableWithoutFeedback key={pageIndex} onPress={this._toggleBar}>
        <View
          style={[{
            flex: 1,
            overflow: 'hidden',
            backgroundColor: 'transparent',
          }]}
        >
          <Text>
            {
              pageLines.map((pageLine, lineIndex) => (
                <Text
                  key={`${pageIndex}-${lineIndex}`}
                  numberOfLines={1}
                  style={[getTheme(this.state.theme).text, chapterStyles]}
                >{pageLine}{"\n"}</Text>
              ))
            }
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderContent() {
    if (STATUS.READY === this.state.status || STATUS.LOADING === this.state.status) {
      return this.renderLoading();
    }
    if (STATUS.FINISH !== this.state.status) {
      return this.renderNone();
    }
    return (
      <Pages
        ref="pages"
        style={{
          paddingTop: 0,
          paddingRight: 10,
          paddingBottom: 40,
          paddingLeft: 20,
        }}
        startPage={this.chapterPageIndex}
        indicatorPosition="none"
        onScrollEnd={this._onPageChanged}
      >
        {
          this.state.chapterPages.map((pageLines, index) => this.renderChapterPage(pageLines, index))
        }
      </Pages>
    )
  }

  renderPageInfo() {
    if (STATUS.FINISH !== this.state.status) {
      return false;
    }

    const precent = (+this.state.progress).toFixed(1);
    return (
      <Fragment>
        <Text style={styles.footer.text}>{this.chapterPageIndex + 1}/{this.state.chapterPages.length} {precent}%</Text>
        <Text style={[styles.footer.text, styles.footer.right]}>20:18</Text>
      </Fragment>
    );
  }

  renderBottomNav() {
    if (!this.state.barShow) {
      return false;
    }

    return (
      <BottomNav
        screenProps={this.props.screenProps}
        navigation={this.props.navigation}
        onChangeBackGround={this._onChangeBackgroundColor}
        onChangeMode={() => this._onChangeBackgroundColor(this.state.theme === moonTheme ? defaultTheme : moonTheme)}
        onCatalogIn={this._onCatalogIn}
      />
    );
  }

  render() {
    const theme = getTheme(this.state.theme);
    return (
      <Page
        containerStyle={theme.background}
      >
        <StatusBar
          barStyle={'light-content'}
          hidden={!this.state.barShow}
          animation={true}
        />
        <View style={styles.title.wrapper} >
          <Text style={styles.title.text} >{this.state.chapterTitle}</Text>
        </View>
        {this.renderContent()}
        <View style={styles.footer.wrapper}>
          {this.renderPageInfo()}
        </View>
        {this.renderBottomNav()}
      </Page>
    );
  }

  _init = async () => {
    const book = this.props.navigation.state.params.book;
    const { data: chapters, err } = await chapterList(book._id);
    if (err || chapters.length === 0) {
      this.setState({
        status: STATUS.FAILED,
      });
      return false;
    }

    // fetch realm book info
    const realmBook = await this._getRealmBook();
    let currentChapter = realmBook.lastReadedChapter;
    this.chapterPageIndex = realmBook.lastChapterReadPage === null ? 0 : realmBook.lastChapterReadPage;

    if (!currentChapter || currentChapter === null) {
      // if current chapter index is null
      currentChapter = 0;
      this._recordChapterChange(currentChapter);
    } else if (currentChapter > (chapters.length - 1)) {
      // if current chapter index lager than last chapter index, 
      // reset current chapter index and set into realm database.
      currentChapter = chapters.length - 1;
      this._recordChapterChange(currentChapter);
    }

    // init some data
    this.setState({
      chapters,
      currentChapter,
      progress: realmBook.progress,
    }, () => {
      this._fetchChapterContent(this.state.chapters[currentChapter].link);
    });
  }

  _fetchChapterContent = async (link) => {
    // 存在章节缓存，直接返回缓存内容
    const { realm, err } = await getRealm();
    const realmChapter = realm.objectForPrimaryKey('Chapter', link);

    const { data: chapter, err: chapterErr } = realmChapter ?
      {
        data: {
          body: realmChapter.content,
          title: realmChapter.title,
        }
      } : await content(link);

    if (chapterErr) {
      this.setState({
        status: STATUS.FAILED,
      });
      return false;
    }

    const { body, title } = chapter;
    const { chapterPages, styles } = await this._processContent(body);
    this.setState({
      status: STATUS.FINISH,
      chapterTitle: title,
      chapterRawContent: body,
      chapterPages,
      chapterStyles: styles,
    });

    return chapterPages;
  }

  _nextChapter = async () => {
    this._jumpToChapter(this.state.currentChapter + 1);
  }

  _prevChapter = async () => {
    this._jumpToChapter(this.state.currentChapter - 1);
  }

  _jumpToChapter = async (chapterIndex) => {
    this.setState({
      status: STATUS.LOADING,
    }, () => {
      this._jumpToChapterRaw(chapterIndex, () => {
        this.setState({
          status: STATUS.FINISH,
        });
      });
    });
  }

  _jumpToChapterRaw = async (chapterIndex, callback = () => { }) => {
    const { currentChapter, chapters } = this.state;
    if (chapterIndex < 0 || chapterIndex > (chapters.length - 1) || chapterIndex === currentChapter) {
      return;
    }

    const chapterPages = await this._fetchChapterContent(chapters[chapterIndex].link);
    const isGo = currentChapter < chapterIndex;
    const resetPageIndex = isGo ? 0 : chapterPages.length - 1;
    this.setState({
      currentChapter: chapterIndex,
      progress: ((currentChapter + 1) / chapters.length * 100).toFixed(2),
    }, () => {
      // reset page index in this chapter to reset page index
      this._resetPagesProgress(this.chapterPageIndex = resetPageIndex, () => {
        // callback invoke
        callback();
      });

      // record chapter change
      this._recordChapterChange(chapterIndex);
    });
  }

  _onPageChanged = async () => {
    const currentPageIndex = this.refs.pages.progress;
    const oldPageIndex = this.chapterPageIndex;
    const pages = this.state.chapterPages.length;

    if (currentPageIndex === 0 && oldPageIndex === 0) {
      // 第一页重复往左滑，前往前一章
      this._prevChapter();
    } else if (currentPageIndex === (pages - 1) && oldPageIndex === (pages - 1)) {
      // 最后一页重复向右滑，前往后一章
      this._nextChapter();
    } else {
      // 中间，记录当前页的索引
      this.chapterPageIndex = currentPageIndex;
      // record chapter page change
      this._recordPageProgress(this.chapterPageIndex);
    }
  }

  _resetPagesProgress = (resetPageIndex, callback) => {
    this.refs.pages.resetProgress(resetPageIndex, callback);
  }

  _processContent = async (text) => {
    const { width: w, height: h } = Dimensions.get('window');
    const theme = getTheme(this.state.theme).text;
    const { fontSize, lineHeight } = theme;

    const words = Math.floor((w - 40) / fontSize);
    const lines = Math.floor((h - 80) / lineHeight);   // 总行数

    const rawLines = text.match(/[^\r\n]+/g);
    // 额外加两个全角空格，调整排版样式
    const processedLines = rawLines.reduce((res, rawLine) => res.concat(this._processLine(`\u3000\u3000${rawLine.trim()}`, words)), []);
    const pagesize = Math.ceil(processedLines.length / lines);

    let chapterPages = [];
    for (var i = 0; i < pagesize; i++) {
      const startIndex = i * lines;
      const endIndex = startIndex + lines;
      const chapterLines = processedLines.slice(startIndex, endIndex);

      chapterPages = [...chapterPages, chapterLines];
    }

    return {
      chapterPages,
      styles: {
        fontSize,
        lineHeight,
        textAlign: 'justify',
        width: words * fontSize,
      },
    };
  }

  _processLine = (line, maxLineWords) => {
    const needNewLine = line.length > maxLineWords;
    const newLines = [];
    if (needNewLine) {
      const newLineSize = Math.ceil(line.length / maxLineWords);
      for (var i = 0; i < newLineSize; i++) {
        if (line.trim() === '') {
          break;
        }
        newLines.push(line.substring(0, maxLineWords));
        line = line.substring(maxLineWords);
      }
    } else {
      newLines.push(line);
    }

    return newLines;
  }

  _toggleBar = () => {
    const barShow = !this.state.barShow;
    this.setState({
      barShow,
    });
    this.props.navigation.setParams({
      barShow,
    });
  }

  _onChangeBackgroundColor = key => {
    this.setState({
      theme: key,
    });
  }

  _onCatalogIn = () => {
    this.props.navigation.navigate('Catalog', {
      chapterList: this.state.chapters,
      chapterIndex: this.state.currentChapter,
      bookName: this.props.navigation.state.params.book.title,

      onChapterClicked: (index, chapter) => {
        this._jumpToChapter(index);
        this._toggleBar();
      },
    });
  }

  _getRealmBook = async () => {
    const { realm, err } = await getRealm();
    const book = this.props.navigation.state.params.book;
    if (this.realmBook
      || (this.realmBook = realm.objectForPrimaryKey('Book', book._id))) {
      return this.realmBook;
    }

    realm.write(() => {
      realm.create('Book', book);
    });
    return (this.realmBook = realm.objectForPrimaryKey('Book', book._id));
  }

  _recordChapterChange = async (currentChapter) => {
    const { realm, err } = await getRealm();
    const chapter = this.state.chapters[currentChapter];
    const book = await this._getRealmBook();
    const realmChapter = realm.objectForPrimaryKey('Chapter', chapter.link);
    requestAnimationFrame(() => {
      realm.write(() => {
        // 修改图书信息
        book.lastReadedTime = new Date().getTime();
        book.lastReadedChapter = currentChapter;
        book.lastReadedChapterName = chapter.title;
        book.progress = +this.state.progress;

        // 增加该章节缓存
        if (!realmChapter) {
          const book = this.props.navigation.getParam('book', {});
          realm.create('Chapter', {
            ...chapter,
            bookId: book._id,
            title: chapter.title,
            link: chapter.link,
            index: currentChapter,
            content: this.state.chapterRawContent,
          });
        }
      });
    });
  }

  _recordPageProgress = async (currentPageIndex) => {
    if (this.pageProgressRecording) {
      return;
    }
    this.pageProgressRecording = true;

    const { realm, err } = await getRealm();
    const book = await this._getRealmBook();
    requestAnimationFrame(() => {
      realm.write(() => {
        book.lastChapterReadPage = currentPageIndex;
      });
      this.pageProgressRecording = false;
    });
  }

  _autoParpareNextChapter = async () => {
    
  }
}


export default ReadScreen;